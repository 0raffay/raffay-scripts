import React, { useState } from "react";

function Accordion({ title, text }) {
    const [accordionOpen, setAccordionOpen] = useState(false);
    return (
        <>
            <div className="accordion">
                <button
                    onClick={() => setAccordionOpen(!accordionOpen)}
                    className="accordionButton py-2 px-2 flex justify-between items-center w-full"
                >
                    <span className="font-sans text-2xl font-bold">
                        {title ? title : "Please Add title prop"}
                    </span>
                    <span className="">+</span>
                </button>
                <div
                    className={`accordionPanel px-2 grid transition-all duration-[250ms] ease-linear 
                    ${accordionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                    <p className="overflow-hidden">
                        {text ? text : "Please Add Text prop"}
                    </p>
                </div>
            </div>
        </>
    );
}

export default Accordion;
