<template>
    <EditorContent v-if="editorWrapper" class="editor-content" :editor="editorWrapper" />
</template>

<script lang="ts">
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent, useEditor } from "@tiptap/vue-3";
import { Prop, toNative, Vue, Watch, Component } from "vue-facing-decorator";

@Component({
    components: { EditorContent },
    emits: ["contentUpdated", "update:modelValue"],
})
class NoteEditor extends Vue {
    @Prop() public modelValue: string;

    public editorWrapper: any = null;

    public created() {
        this.editorWrapper = new Editor({
            extensions: [StarterKit, Highlight, Typography],
            autofocus: "end",
            content: this.modelValue,
            parseOptions: {
                preserveWhitespace: "full",
            },
            onUpdate: ({ editor }) => {
                this.$emit("update:modelValue", editor.getHTML());
            },
        });
    }

    @Watch("modelValue")
    public onModelValueChanged(value: string) {
        // this.editorWrapper.commands.setContent(value, false);
        this.$emit("contentUpdated", { html: value, raw: this.editorWrapper.getText() });
    }
}

export default toNative(NoteEditor);
</script>

<style>
.editor-content {
    width: 100%;
    height: 100%;
}
.editor-content .tiptap {
    height: 100%;
    outline: none;
    padding: 12px;
}
</style>

<style lang="scss">
@use "../../styles/vars.scss" as *;

.tiptap {
    font-size: 0.9rem;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        text-wrap: pretty;
        font-family: "Inter", sans-serif;
    }

    h1,
    h2 {
        margin-bottom: 0.5rem;
        font-weight: 500;
    }

    h1 {
        font-size: 1.4rem;
    }

    h2 {
        font-size: 1.2rem;
    }

    h3 {
        font-size: 1.1rem;
    }

    h4,
    h5,
    h6 {
        font-size: 1rem;
    }

    /* Code and preformatted text styles */
    code {
        background-color: var(--purple-light);
        border-radius: 0.4rem;
        color: var(--black);
        font-size: 0.85rem;
        padding: 0.25em 0.3em;
    }

    pre {
        background: var(--black);
        border-radius: 0.5rem;
        color: var(--white);
        font-family: "JetBrainsMono", monospace;
        margin: 1.5rem 0;
        padding: 0.75rem 1rem;

        code {
            background: none;
            color: inherit;
            font-size: 0.8rem;
            padding: 0;
        }
    }

    mark {
        background-color: #faf594;
        border-radius: 0.4rem;
        box-decoration-break: clone;
        padding: 0.1rem 0.3rem;
    }

    blockquote {
        background: #f9f9f9;
        border-left: 10px solid var(--gray-300);
        margin: 1.5em 10px;
        padding: 1em 10px;
    }

    hr {
        border: none;
        border-top: 1px solid var(--gray-200);
        margin: 2rem 0;
    }

    ul,
    ol {
        padding: 0 1rem;
        margin: 1.25rem 1rem 1.25rem 0.4rem;
        list-style: initial;

        li p {
            margin-top: 0.25em;
            margin-bottom: 0.25em;
        }
    }
}
</style>
