<template>
  <div class="wrapper">
    <!-- Nav -->
    <nav>
      <h2>WorkoutsGPT</h2>
      <a>About</a>
    </nav>

    <!-- Header -->
    <header class="center">
      <h1>Create a workout in seconds with chatGPT.</h1>
      <p>Generate the perfect workout for your next gym session.</p>
    </header>

    <!-- Generator -->
    <div class="generator">
      <!-- Length (minutes) -->
      <div>
        <label><strong>1. Choose a workout length</strong></label>
        <select v-model="length">
          <option v-for="(item, index) in lengths" :key="index" :value="item" :selected="item === length">{{ item }} minutes</option>
        </select>
      </div>

      <!-- Muscle Groups -->
      <div>
        <label><strong>2. Choose which muscle groups to workout</strong></label>
        <div class="muscle-groups">
          <div
            v-for="(item, index) in muscleGroups"
            :key="index"
            class="muscle-group"
            :class="{ 'muscle-group-selected': muscleGroupsSelected.includes(item) }"
            @click="toggleMuscleGroup(item)"
          >
            <span class="muscle-group-check">✔️</span>
            {{ item }}
          </div>
        </div>
      </div>

      <!-- Generate Button -->
      <div>
        <button class="button generate-button" data-type="primary" @click="generate()" :disabled="loading">
          <span v-if="!loading">Generate Workout</span><span v-else>Loading...</span>
        </button>
      </div>

      <!-- Workout -->
      <div>
        <div v-if="workout" class="workout">
          <p>{{ workout }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const loading = ref(false)

// workout length
const length = ref(30)
const lengths = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]

// muscle groups
const muscleGroups = ['biceps', 'back', 'abs', 'legs', 'shoulders', 'chest']
const muscleGroupsSelected = ref([] as String[])

function toggleMuscleGroup(value: string) {
  const index = muscleGroupsSelected.value.findIndex((v) => v === value)
  if (index >= 0) {
    muscleGroupsSelected.value.splice(index, 1)
  } else {
    muscleGroupsSelected.value.push(value)
  }
}

// generate workout
const workout = ref('')
async function generate() {
  // start loading
  loading.value = true

  // clear existing workout
  workout.value = ''

  try {
    // generate the workout
    const data = await $fetch('/api/generate', { method: 'post', body: { length: length.value, muscleGroups: muscleGroupsSelected.value } })

    // set the results
    workout.value = data
  } catch (e) {
    console.log('Error generating workout:', e)
  }

  // end loading
  loading.value = false
}
</script>
<style scoped>
/* Nav */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Header */
header {
  max-width: 1000px;
  margin: auto;
}

/* Generator */
.generator {
  max-width: 600px;
  margin: 4em auto;
  display: grid;
  gap: 2em;
}

/* Muscle Groups */
.muscle-groups {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.muscle-group {
  border: 1px solid var(--grey);
  border-radius: 6px;
  background: #fff;
  padding: 0.7em 1.4em;
  position: relative;
}
.muscle-group:hover {
  background: #fafafa;
  cursor: pointer;
}
.muscle-group-selected {
  border-color: var(--black);
}
.muscle-group-check {
  display: none;
  position: absolute;
  top: -4px;
  right: -4px;
  background: #fff;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--black);
  font-size: 11px;
}
.muscle-group-selected > .muscle-group-check {
  display: flex;
}

/* Generate Button */
.generate-button {
  width: 100%;
  justify-content: center;
}

/* Workout */
.workout {
  margin-top: 1em;
  white-space: pre-line;
  border: 1px solid var(--grey);
  padding: 1.4em;
  border-radius: 4px;
  background: #fff;
}
</style>
