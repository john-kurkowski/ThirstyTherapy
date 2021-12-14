declare module "svelte-inline-input" {
  import { SvelteComponentTyped } from "svelte";

  export interface defaultProps {
    /**
     * @default ''
     */
    value?: string;

    /**
     * @default 'text'
     */
    type?: string;

    /**
     * @default ''
     */
    placeholder?: string;

    /**
     * @default ''
     */
    labelClasses?: string;

    /**
     * @default ''
     */
    inputClasses?: string;

    /**
     * @default 2
     */
    rows?: number;

    /**
     * @default 20
     */
    cols?: number;

    /**
     * @default []
     */
    options?: [];
  }

  export default class extends SvelteComponentTyped<
    defaultProps,
    // This is the 3rd party lib's type.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { blur: CustomEvent<any> },
    { selectCaret: unknown }
  > {}
}
