module.exports = {
    "env": {
        "browser": true,
		"amd": true
    },
    "extends": "eslint:recommended",
	"parser": "babel-eslint",
    "parserOptions": {
		"sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018
    },
    "plugins": [
        "react"
    ],
    "rules": {
		"react/jsx-uses-vars": 1,
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
