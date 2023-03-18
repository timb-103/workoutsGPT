/**
 * API REFERENCE:
 * https://platform.openai.com/docs/api-reference/chat
 */

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { muscleGroups, length, location } = body

    // create the prompt
    let prompt = `Create a ${location} workout that goes for ${length} minutes and works out the following muscle groups: ${muscleGroups}. Estimate how long each section will take roughly.`

    // send to openai
    const result = (await $fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that creates gym workouts. You will only respond with the workout plan, reps, sets and time it takes, no additional notes or explanations. Format each section as follows: "1. Warm-up (5 minutes): Exercises"',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 1,
        max_tokens: 818,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 0,
        n: 1,
      }),
    })) as any

    // set the workout text (remove leading new lines)
    let workout = result?.choices?.[0]?.message?.content
    if (workout.substring(0, 2) === '\n\n') {
      workout = workout.substring(2)
    }

    // log some stuff
    console.log(`[Prompt] ${prompt}`)
    console.log(`[Tokens] ${result?.usage?.total_tokens} (prompt: ${result?.usage?.prompt_tokens}, completion: ${result?.usage?.completion_tokens})`)
    console.log(`[Workout] ${workout}`)

    // return to browser
    return workout
  } catch (e) {
    console.log(e)
  }

  // return an error
  return ''
})
