ax = require 'securemsg'

describe 'securemsg library', ->

  it 'has a ratchet module', ->
    ax.should.have.property 'ratchet'
    ax.ratchet.should.be.type 'object'

  describe 'ratchet module', ->
    require('./suite-ratchet.coffee')(ax.ratchet)

  it 'has a mixins module', ->
    ax.should.have.property 'mixins'
    ax.mixins.should.be.type 'object'

  describe 'mixins module', ->
    require('./suite-mixins.coffee')(ax.mixins)