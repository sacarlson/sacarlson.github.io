these are Stellar.org release V0.4.0 from https://github.com/stellar/bower-js-stellar-sdk
SHA cd1ecc03cce645b6f7b12abc211b239d24b39388  git release

shasum -a 256 stellar-sdk.min.js
f76776eaf2adb63ac4a3cfec076262c1bee951fa7cf6816c4cd0da7325f541b9  stellar-sdk.min.js

 shasum -a 256 stellar-sdk.js
2a4ccb0b23dd88d6bd64c16badd6cd82cfe799b8a5df0935214dad4b0d5cbaf0  stellar-sdk.js


to confirm these are uncorupted copies of stellar.org you could perform this:

    Download and perform a checksum on the official stellar.org code

    $git clone --branch v0.4.0 git@github.com:stellar/bower-js-stellar-sdk.git
    $shasum -a 256 bower-js-stellar-sdk/stellar-sdk.min.js
    f76776eaf2adb63ac4a3cfec076262c1bee951fa7cf6816c4cd0da7325f541b9  bower-js-stellar-sdk/stellar-sdk.min.js

    Download the version we're hosting, and compare

    $wget https://sacarlson.github.io/js/sdk_v0.4.0/stellar-sdk.min.js
    $shasum -a 256 stellar-sdk.min.js
    f76776eaf2adb63ac4a3cfec076262c1bee951fa7cf6816c4cd0da7325f541b9  stellar-sdk.min.js



