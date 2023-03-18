<template>
  <div class="wrapper">
    <!-- Nav -->
    <nav class="center">
      <h2>💪 WorkoutsGPT</h2>
    </nav>

    <!-- Header -->
    <header class="center">
      <h1>Create Workouts in Seconds with chatGPT</h1>
      <p>Simply enter your workout length & muscle groups to generate the perfect workout for your next gym session, free.</p>
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

      <!-- Location  -->
      <div>
        <label><strong>2. Where are you working out?</strong></label>
        <div class="options">
          <div
            v-for="(item, index) in locations"
            :key="index"
            class="option"
            :class="{ 'option-selected': location === item }"
            @click="toggleLocation(item)"
          >
            <span class="option-check">✔️</span>
            {{ item }}
          </div>
        </div>
      </div>

      <!-- Muscle Groups -->
      <div>
        <label><strong>3. Choose which muscle groups to workout</strong></label>
        <div class="options">
          <div
            v-for="(item, index) in muscleGroups"
            :key="index"
            class="option"
            :class="{ 'option-selected': muscleGroupsSelected.includes(item) }"
            @click="toggleMuscleGroup(item)"
          >
            <span class="option-check">✔️</span>
            {{ item }}
          </div>
        </div>

        <br />

        <!-- Advanced Muscle Groups -->
        <label>..or choose more specific muscles</label>
        <div class="options">
          <div
            v-for="(item, index) in muscleGroupsAdvanced"
            :key="index"
            class="option"
            :class="{ 'option-selected': muscleGroupsSelected.includes(item) }"
            @click="toggleMuscleGroup(item)"
          >
            <span class="option-check">✔️</span>
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
          <label><strong>Here's your workout:</strong></label>
          <p>{{ workout }}</p>
        </div>
      </div>

      <!-- Made By -->
      <div class="made-by center">
        <p>
          Built by <a href="https://twitter.com/Timb03" target="_blank">Tim Bennetto</a> using
          <a href="https://chat.openai.com/chat" target="_blank">chatGPT</a> and hosted on <a href="https://vercel.com" target="_blank">Vercel</a>'s
          free plan.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'WorksoutsGPT - Create Workouts in Seconds with chatGPT' })

const loading = ref(false)

// locations
const locations = ref(['gym', 'home'])
const location = ref('gym')
function toggleLocation(value: string) {
  location.value = value
}

// workout length
const length = ref(30)
const lengths = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]

// muscle groups
const muscleGroups = ['biceps', 'back', 'abs', 'legs', 'shoulders', 'chest', 'quadriceps', 'hamstrings', 'calves', 'triceps', 'forearms']
const muscleGroupsAdvanced = ['glutes', 'transverse abs', 'psoas']
const muscleGroupsSelected = ref(['biceps', 'transverse abs', 'psoas'])

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
    const data = await $fetch('/api/generate', {
      method: 'post',
      body: { length: length.value, muscleGroups: muscleGroupsSelected.value, location: location.value },
    })

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
/* Header */
header {
  max-width: 600px;
  margin: 4em auto auto auto;
}

/* Generator */
.generator {
  max-width: 600px;
  margin: 4em auto;
  display: grid;
  gap: 2em;
}

/* Muscle Groups */
.options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.option {
  border: 1px solid var(--grey);
  border-radius: 6px;
  background: #fff;
  padding: 0.7em 1.4em;
  position: relative;
}
.option:hover {
  background: #fafafa;
  cursor: pointer;
}
.option-selected {
  border-color: var(--black);
}
.option-check {
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
.option-selected > .option-check {
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

/* Made By */
.made-by > p {
  font-size: 15px;
}
</style>
