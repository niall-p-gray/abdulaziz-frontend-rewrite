export default {
  UPDATE_FIELDS (state, updatedFields) {
    state.fields = {
      ...state.fields,
      ...updatedFields
    }
  }
}
