extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

mod array;
mod string;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: String);
}
