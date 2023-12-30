# check max deps
A script that will check the number of dependencies in a project, and exit with a pass or fail exit code.

This can be helpful as a part of the package scripts.

## install
```sh
npm i -D @nichoth/check-max-deps
```

## use
```sh
check-deps $DIR $COUNT
```

## example
From the CLI, check the that the dependencies in `.` are at most `1`:
```sh
npx check-deps . 1
```

To check that you have 0 dependencies before bumping the version:
```js
{
  "scripts": {
    "preversion": "check-deps . 0"
  }
}
```

## test
```sh
npm test
```

