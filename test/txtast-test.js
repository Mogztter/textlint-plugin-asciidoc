'use strict'

const { test } = require("@textlint/ast-tester")

const fs = require('fs'),
  path = require('path'),
  AsciiDocParser = require('../lib/asciidoc-parser'),
  LineReader = require('../lib/line-reader')

describe('TxtAST', () => {
  const fixtures = fs.readdirSync(path.join(__dirname, 'fixtures'))
  for (const fixture of fixtures) {
    context(fixture, () => {
      it('should produce a valid TxtAST', () => {
        const ast = parseFixture(loadFixture(fixture))
        test(ast)
      })
    })
  }

  const loadFixture = (filename) => {
    let fixturePath = path.join(__dirname, 'fixtures', filename),
      fixtureContents = fs.readFileSync(fixturePath, 'UTF-8')
    return { path: fixturePath, contents: fixtureContents }
  }

  const parseFixture = (fixture) => new AsciiDocParser(new LineReader(fixture.contents).readLines()).parse()
})
