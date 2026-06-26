const validators = require("../middleware/validators");
const { validationResult } = require("express-validator");

test('Make sure username is not empty', async () => {
    const req = {
        body: {
            username: ""
        },
    };
    for (const validator of validators.validateUsername) {
        await validator.run(req);
    }
    const result = validationResult(req);
    expect(result.errors[0]).toEqual({
        type: 'field',
        value: '',
        msg: 'Invalid value',
        path: 'username',
        location: 'body'
    });
});

test('For username, strip leading and trailing whitespace and change to lowercase', async () => {
    const req = {
        body: {
            username: " Jacob ",
        },
    };
    for (const validator of validators.validateUsername) {
        await validator.run(req);
    }
    expect(req.body.username).toBe("jacob");
});

test('Make sure password is not empty', async () => {
    const req = {
        body: {
            password: ""
        },
    };
    for (const validator of validators.validatePassword) {
        await validator.run(req);
    }
    const result = validationResult(req);
    expect(result.errors[0]).toEqual({
        type: 'field',
        value: '',
        msg: 'Invalid value',
        path: 'password',
        location: 'body'
    });
});

test('Make sure password is not weak', async () => {
    const req = {
        body: {
            password: "abc123"
        },
    };
    for (const validator of validators.validatePassword) {
        await validator.run(req);
    }
    const result = validationResult(req);
    expect(result.errors[0]).toEqual({
        type: 'field',
        value: 'abc123',
        msg: 'Invalid value',
        path: 'password',
        location: 'body'
    });
});

test('Make sure strong password passes', async () => {
    const req = {
        body: {
            password: "fjR43*^ghdss14gqW3#"
        },
    };
    for (const validator of validators.validatePassword) {
        await validator.run(req);
    }
    const result = validationResult(req);
    expect(req.body.password).toBe("fjR43*^ghdss14gqW3#");
    expect(result.errors.length).toBe(0);
});


// test('', () async => {
//     const req = {
//         body: {
//             
//         },
//     };
//     for (const validator of validators.validatePostTitle) {
//         await validator.run(req);
//     }
//     // TKTK 
// });
// 
// test('', () async => {
//     const req = {
//         body: {
//             
//         },
//     };
//     for (const validator of validators.validatePostContent) {
//         await validator.run(req);
//     }
//     // TKTK 
// });
// 
// test('', () async => {
//     const req = {
//         body: {
//             
//         },
//     };
//     for (const validator of validators.validateComment) {
//         await validator.run(req);
//     }
//     // TKTK 
// });
