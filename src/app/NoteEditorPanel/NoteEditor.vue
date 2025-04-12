<template>
    <EditorContent v-if="editorWrapper" class="editor-content small-scroll" :editor="editorWrapper" />
</template>

<script lang="ts">
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { Prop, toNative, Vue, Watch, Component } from "vue-facing-decorator";
import Note from "../Notes/Models/Note";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";

@Component({
    components: { EditorContent },
    emits: ["contentUpdated", "update:modelValue"],
})
class NoteEditor extends Vue {
    @Prop() public selectedNote: Note;

    public editorWrapper: Editor = null;

    public created() {
        this.editorWrapper = new Editor({
            extensions: [
                StarterKit.configure({
                    bulletList: {
                        HTMLAttributes: {
                            class: "bullet-list",
                        },
                    },
                    orderedList: {
                        HTMLAttributes: {
                            class: "ordered-list",
                        },
                    },
                    listItem: {
                        HTMLAttributes: {
                            class: "list-item",
                        },
                    },
                }),
                // OrderedList,
                // ListItem,
                Highlight,
                Typography,
                TaskList.configure({
                    HTMLAttributes: {
                        class: "task-list",
                    },
                }),
                TaskItem.configure({
                    nested: true,
                }),
            ],
            autofocus: "end",
            parseOptions: {
                preserveWhitespace: "full",
            },
            onUpdate: ({ editor }) => {
                const html = editor.getHTML();
                const raw = editor.getText();
                this.$emit("contentUpdated", { html, raw });
            },
        });

        this.editorWrapper.commands.setContent(this.selectedNote.content);
    }

    @Watch("selectedNote")
    public onModelValueChanged() {
        this.editorWrapper.commands.setContent(this.selectedNote.content);
    }
}

export default toNative(NoteEditor);
</script>

<style>
.editor-content {
    width: 100%;
    height: 100%;
    overflow: auto;
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
        font-size: 1.6rem;
    }
    h2 {
        font-size: 1.3rem;
    }
    h3 {
        font-size: 1.1rem;
        font-weight: 500;
    }
    h4,
    h5,
    h6 {
        font-size: 0.9rem;
    }

    /* Code and preformatted text styles */
    code {
        background-color: var(--purple-light);
        border-radius: 0.4rem;
        color: var(--black);
        font-size: 0.85rem;
        padding: 0.25em 0.3em;
        font-family: "Fira Code", monospace;
        font-style: normal;
    }

    pre {
        background: var(--black);
        border-radius: 0.5rem;
        color: var(--white);
        font-family: "Fira Code", monospace;
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

    .bullet-list,
    .ordered-list {
        padding: 0 1rem;
        margin: 0.4rem 0.2rem 0.4rem 0.4rem;

        li p {
            margin-top: 0.25em;
            margin-bottom: 0.25em;
        }
    }

    /* Task list specific styles */
    .task-list {
        list-style: none;
        margin-left: 0;
        padding: 0;
        // font-family: "Inter", sans-serif;

        li {
            align-items: flex-start;
            display: flex;
            margin: 5px 0;

            > label {
                flex: 0 0 auto;
                margin-right: 0.5rem;
                user-select: none;
                border-radius: 50px;
                // font-family: "Inter", sans-serif;
            }

            > div {
                flex: 1 1 auto;
            }

            &[data-checked="true"] {
                text-decoration: line-through; // Exemplo: tachar o texto
                color: #3d3d3d;
            }
        }

        input[type="checkbox"] {
            cursor: pointer;
        }

        input[type="checkbox"],
        input[type="radio"] {
            --active: var(--primary-color);
            --active-inner: #fff;
            --focus: 2px rgba(39, 94, 254, 0.3);
            --border: #bbc1e1;
            --border-hover: var(--primary-color-hover);
            --background: #fff;
            --disabled: #f6f8ff;
            --disabled-inner: #e1e6f9;
            -webkit-appearance: none;
            -moz-appearance: none;
            height: 17px;
            outline: none;
            display: inline-block;
            vertical-align: top;
            position: relative;
            margin: 0;
            margin-top: 3px;
            cursor: pointer;
            border: 1px solid var(--bc, var(--border));
            background: var(--b, var(--background));
            transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
            &:after {
                content: "";
                display: block;
                left: 0;
                top: 0;
                position: absolute;
                transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
            }
            &:checked {
                --b: var(--active);
                --bc: var(--active);
                --d-o: 0.3s;
                --d-t: 0.6s;
                --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
            }
            &:disabled {
                --b: var(--disabled);
                cursor: not-allowed;
                opacity: 0.9;
                &:checked {
                    --b: var(--disabled-inner);
                    --bc: var(--border);
                }
                & + label {
                    cursor: not-allowed;
                }
            }
            &:hover {
                &:not(:checked) {
                    &:not(:disabled) {
                        --bc: var(--border-hover);
                    }
                }
            }
            &:focus {
                box-shadow: 0 0 0 var(--focus);
            }
            &:not(.switch) {
                width: 17px;
                &:after {
                    opacity: var(--o, 0);
                }
                &:checked {
                    --o: 1;
                }
            }
            & + label {
                font-size: 14px;
                line-height: 21px;
                display: inline-block;
                vertical-align: top;
                cursor: pointer;
                margin-left: 4px;
            }
        }
        input[type="checkbox"] {
            &:not(.switch) {
                border-radius: 20px;
                &:after {
                    width: 4px;
                    height: 7px;
                    border: 2px solid var(--active-inner);
                    border-top: 0;
                    border-left: 0;
                    left: 5px;
                    top: 3px;
                    transform: rotate(var(--r, 20deg));
                }
                &:checked {
                    --r: 43deg;
                }
            }
        }

        ul[data-type="taskList"] {
            margin: 0;
        }
    }
}
</style>
