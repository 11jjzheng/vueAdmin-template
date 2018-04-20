<template>
  <div class="json-editor">
    <textarea ref="textarea"></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
require('script-loader!jsonlint')
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

export default {
  name: 'jsonEditor',
  data() {
    return {
      jsonEditor: false
    }
  },
  props: {
    value: String,
    readOnly: {
      type: Boolean,
      default: false
    },
    id: String
  },
  watch: {
    value(value) {
      const editor_value = this.jsonEditor.getValue()
      if (value !== editor_value) {
        try {
          this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
        } catch(err) {

        }
      }
    }
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true,
      readOnly: this.readOnly
    })

    try {
      this.jsonEditor.setValue(JSON.stringify(JSON.parse(this.value), null, 2))
    } catch(err) {

    }
    this.jsonEditor.on('change', cm => {
      this.$emit('changed', {id: this.id, data: cm.getValue()})
    })
  },
  methods: {
    getValue() {
      return this.jsonEditor.getValue()
    }
  }
}
</script>

<style scoped>
.json-editor{
  height: 100%;
  position: relative;
}
.json-editor >>> .CodeMirror {
  height: auto;
  min-height: 300px;
}
.json-editor >>> .CodeMirror-scroll{
  min-height: 300px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>
