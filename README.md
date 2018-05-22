# node-bkash

bKash API client for Browser & Node.js

bKash API docs: https://developer.bka.sh/reference

## Installation

via **npm**:

```sh
$ npm install bkash --save
```

via **yarn**:

```sh
$ yarn add bkash
```

## Usage

### Browser


```html
<script src="https://unpkg.com/bkash/dist/bkash.min.js"></script>
<script>
  const bkash = new BKash()
</script>
```

### Node

```js
const BKash = require('bkash')

const bkash = new BKash({
  mode: 'sandbox',
  service: 'direct',
  version: '0.40.0',
  timeout: 0, // req/res timeout in ms, 0 means disabled
})

// https://developer.bka.sh/v0.40.0/reference#querypaymentusingget
bkash.checkout.payment.query({
  paymentID: '42'
}).then(({ data, meta }) => {
  // handle data
})
```

## Authentication

```js
// required for token.grant and token.refresh methods
bkash.authenticate({
  type: 'simple',
  username: 'username',
  password: 'password'
})

// required for all other methods
bkash.authenticate({
  type: 'token',
  token: 'token',
  appkey: 'appkey'
})
```

## Changelog

[Changelog for node-bkash](https://github.com/MunifTanjim/node-bkash/blob/master/CHANGELOG.md)

## License

Licensed under the MIT License. Check the [LICENSE](https://github.com/MunifTanjim/node-bkash/blob/master/LICENSE) file for details.
