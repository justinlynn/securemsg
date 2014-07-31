m = require('mixation').mixin
Serializable = require '../../mixins/serializable.coffee'

class State

  @manager = require('./state/manager.coffee')
  @onDiskFormat = require('./state/on-disk-format.coffee')
  @crypto = {
    ladder: require('./crypto/ladder.coffee')
  }

  m.composeInto State, Serializable
##
module.exports = State