const assert = require('assert').strict
const parser = require('./parser')

describe("parser test", () => {
    it("should return a correct parsed object for basic bash commands", () => {

        assert.deepStrictEqual(
            parser.parse('echo Hello World'),
            [
                {
                    program: "echo",
                    args: [
                        "Hello",
                        "World"
                    ]
                }
            ]
        )

        assert.deepStrictEqual(
            parser.parse('echo "Hello World !"'),
            [
                {
                    program: "echo",
                    args: [
                        '"Hello World !"'
                    ]
                }
            ]
        )

        assert.deepStrictEqual(
            parser.parse("echo 'Hello World!'"),
            [
                {
                    program: "echo",
                    args: [
                        "'Hello World!'"
                    ]
                }
            ]
        )
    })

    it("should return a correct parsed object for multiples basic bash commands", () => {

        assert.deepStrictEqual(
            parser.parse('echo Hello World && cat /dev/null'),
            [
                {
                    program: "echo",
                    args: [
                        "Hello",
                        "World"
                    ]
                },
                {
                    program: "cat",
                    args: [
                        "/dev/null"
                    ]
                }
            ]
        )

        assert.deepStrictEqual(
            parser.parse('echo "Hello World" && cd /home && ls *'),
            [
                {
                    program: "echo",
                    args: [
                        '"Hello World"'
                    ]
                },
                {
                    program: "cd",
                    args: [
                        "/home"
                    ]
                },
                {
                    program: "ls",
                    args: [
                        "*"
                    ]
                }
            ]
        )
    })

    it("should return a correct parsed object for basic bash commands with params", () => {
        assert.deepStrictEqual(
            parser.parse('echo -n Hello World'),
            [
                {
                    program: "echo",
                    params: {
                        '-n': ''
                    },
                    args: [
                        "Hello",
                        "World"
                    ]
                }
            ]
        )

        assert.deepStrictEqual(
            parser.parse('echo -n "Hello World"'),
            [
                {
                    program: "echo",
                    params: {
                        '-n': ''
                    },
                    args: [
                        '"Hello World"'
                    ]
                }
            ]
        )
    })

    it("should return a correct parsed object for complex bash commands with params", () => {
        assert.deepStrictEqual(
            parser.parse('echo -n -t Hello World'),
            [
                {
                    program: "echo",
                    params: {
                        '-n': '',
                        '-t': ''
                    },
                    args: [
                        "Hello",
                        "World"
                    ]
                }
            ]
        )

        assert.deepStrictEqual(
            parser.parse('echo -n -t --test="hey" "Hello World"'),
            [
                {
                    program: "echo",
                    params: {
                        '-n': '',
                        '-t': '',
                        '--test': '"hey"'
                    },
                    args: [
                        '"Hello World"'
                    ]
                }
            ]
        )

        assert.deepStrictEqual(
            parser.parse('echo -n -t --test="hey la !" Hello World'),
            [
                {
                    program: "echo",
                    params: {
                        '-n': '',
                        '-t': '',
                        '--test': '"hey la !"'
                    },
                    args: [
                        "Hello",
                        "World"
                    ]
                }
            ]
        )
    })
})