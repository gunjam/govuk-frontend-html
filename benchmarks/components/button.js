import { bench, run } from 'mitata'
import govukButton from '../../components/button/button.js'

bench('govukButton({ text: "Start now", isStartButton: true })', () => {
  govukButton({
    text: 'Start now',
    isStartButton: true
  })
})

await run()
