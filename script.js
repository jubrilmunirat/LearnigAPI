const adviceId = document.getElementById('advice-id');
const adviceText = document.getElementById('advice-text');
const generateButton = document.getElementById('generate-advice');

async function getAdvice() {
    generateButton.disabled = true;
    try {
        // making API request to the advice slip
        const response = await fetch(`https://api.adviceslip.com/advice?t=${Date.now()}`, {
            cache: 'no-store',
        });
        // if the request is not succesful throw an error
        if (!response.ok) {
            throw new Error(`The advice service is currently not available`);
        }
        // coverting the response to json 
        const data = await response.json();
        console.log(data)
        console.log(adviceText)

        if (!data.slip || !data.slip.id || !data.slip.advice) {
            throw new Error('The advice service return an unexpected response.');
        }
        // display the new advice
        adviceId.textContent = data.slip.id;
        adviceText.textContent = `${data.slip.advice}`;
    } catch (error) {
        console.error('Advice request failed:', error);

    } finally {
        generateButton.disabled = false;
    }

}
generateButton.addEventListener('click', getAdvice);