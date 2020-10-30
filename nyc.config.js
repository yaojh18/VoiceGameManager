module.exports = {
    'check-coverage': true,
    'per-file': true,
    'lines': 0,
    'statements': 0,
    'functions': 0,
    'branches': 0,
    'include': [
        'src/**/*.js',
        'src/**/*.vue'
    ],
    'exclude': [
        'src/abandon-ui/**',
        'src/*.js',
        '**/*.spec.js'
    ],
    'reporter': [
        'lcov',
        'text',
        'text-summary'
    ],
    'extension': [
        '.js',
        '.vue'
    ],
    'cache': true,
    'all': true
}