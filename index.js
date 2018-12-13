const promiseRetry = require('promise-retry');

const myOperation = () => {
  throw 'This is a test';
}

const retryMyOperation = promiseRetry(async (retry, attempt) => {
  try {
    await myOperation(); 
  } catch (err) {
    console.log(`After attempt ${attempt}, err is:`, err);
    retry();
  }
}, {
  retries: 3,
  maxTimeout: 100,
  minTimeout: 10,
}).catch(err => {
  console.log('Catch on promiseRetry, err is:', err);
  throw err;
})

const main = async () => {
  try {
    await retryMyOperation();
  } catch (err) {
    console.log('Gave up, err is:', err);
  }
}

if (require.main === module) {
  main().catch(err => console.err('Outermost catch, err is:', err));
}