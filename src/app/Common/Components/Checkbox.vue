<template>
    <input type="checkbox" />
</template>

<script lang="ts" setup>

</script>

<style scoped>
@supports (-webkit-appearance: none) or (-moz-appearance: none) {
    input[type="checkbox"],
    input[type="radio"] {
        --active: #275efe;
        --active-inner: #fff;
        --focus: 2px rgba(39, 94, 254, 0.3);
        --border: #bbc1e1;
        --border-hover: #275efe;
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
}
</style>
