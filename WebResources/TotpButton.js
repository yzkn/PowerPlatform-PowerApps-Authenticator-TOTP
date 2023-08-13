
// window.addEventListener('load', function () {

var TotpButton = window.TotpButton || {};
(function () {
    this.formOnLoad = async function (executionContext) {
        let formContext = executionContext.getFormContext();

        //

        let key;
        let _interval;

        // const keyString = 'otpauth://totp/mytest:user1?secret=2JLXFRTKDX7EVJ2ZRETEW655JA';
        const keyString = formContext.getAttribute('ya_key').getValue();

        if (keyString) {
            if (keyString.indexOf('?') != -1) {
                const paramsString = keyString.split('?')[1];
                const searchParams = new URLSearchParams(paramsString);

                if (searchParams.has('secret')) {
                    key = searchParams.get('secret');
                }
            } else {
                key = keyString;
            }

            if (key) {
                if (_interval) {
                    clearInterval(_interval);
                }

                const _loop = async function () {
                    const totp = new TOTP(key);
                    const code = await totp.gen();
                    formContext.getAttribute("ya_generatedcode").setValue(code);
                };

                await _loop();
                _interval = window.setInterval(_loop, 5000);
            }
        }

        //

    }
}).call(TotpButton);

// });
