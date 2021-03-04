declare module "svelte-routing" {
	export interface RouterProps {
		url: string
	}
	export declare class Router {
		$$prop_def: RouterProps
	}

	export interface RouteProps {
		path: string
		component: any
	}
	export declare class Route {
		$$prop_def: RouteProps
	}

	export interface LinkProps { }
	export declare class Link {
		$$prop_def: LinkProps
	}

	export function navigate<T = {}>(path: string, options?: {
		replace?: boolean
		state?: T
	}): void
}
