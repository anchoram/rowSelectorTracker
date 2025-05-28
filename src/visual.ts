"use strict";

import "core-js/stable";
import "./../style/visual.less";

import powerbi from "powerbi-visuals-api";
import IVisual = powerbi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

export class Visual implements IVisual {
    private target: HTMLElement;
    private headerTextElement: HTMLElement;

    constructor(options: VisualConstructorOptions) {
        this.target = options.element;
        this.target.innerHTML = `
            <div id="header-text"></div>
        `;
        this.headerTextElement = this.target.querySelector("#header-text") as HTMLElement;
    }

    public update(options: VisualUpdateOptions): void {
        const dataView = options.dataViews?.[0];
        const categories = dataView?.categorical?.categories;

        // If no selection or data, show nothing
        if (!categories || categories.length === 0) {
            this.headerTextElement.innerText = "";
            return;
        }

        // Extract and join category names using " > "
        const selectedHeaders: string[] = categories.map(cat => cat.source.displayName);
        this.headerTextElement.innerText = selectedHeaders.join(" > ");
    }
}
