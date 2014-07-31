m = require('mixation').mixin
Serializable = require '../mixins/serializable.coffee'
State = require './session/state.coffee'

class Session

  constructor: (ourAgent, theirAgent) ->
    @ourAgent = ourAgent
    @theirAgent = theirAgent
    @state = new State

  m.composeInto @, Serializable

##
module.exports = Session