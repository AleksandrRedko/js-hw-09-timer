 const refs = {
form: document.querySelector('.form'),
}

refs.form.addEventListener('submit',onFormSubmit);

function onFormSubmit(e){
  e.preventDefault ()
  let delay = Number(e.currentTarget.delay.value);
  const step = Number(e.currentTarget.step.value);
  const amount = Number(e.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms` );
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms` );
        }, delay);
      });
    delay += step;
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = { position, delay };

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(promise);
    }
      reject(promise);
  });
}

 