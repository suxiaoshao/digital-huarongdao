extern crate wasm_bindgen;
use std::collections::{HashSet, LinkedList};

use js_sys::Math::random;
use queue_item::QueueItem;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

mod queue_item;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: String);
}

#[wasm_bindgen]
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct GameData {
    #[serde(rename = "serialNumber")]
    serial_number: [u8; 9],
}
#[wasm_bindgen]
impl GameData {
    pub fn new() -> Self {
        // 为空的下标
        let index = (random() * 9.0) as usize;
        // 数据
        let mut serial_number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        serial_number[index] = 0;
        // 队列
        let mut queue = LinkedList::new();
        queue.push_back(QueueItem::new(serial_number, String::new()));
        // 最大步长
        let mut max_steps = 0;
        // 最终数组
        let mut result = vec![];
        // 已经看过的数据
        let mut seen_state = HashSet::new();
        seen_state.insert(serial_number);
        loop {
            let q_item = match queue.pop_front() {
                Some(q_item) => q_item,
                None => break,
            };
            if q_item.operations.len() == max_steps {
                result.push(q_item.clone());
            } else if q_item.operations.len() > max_steps {
                max_steps = q_item.operations.len();
                result.clear();
                result.push(q_item.clone())
            }
            q_item.next().into_iter().for_each(|new_item| {
                if !seen_state.contains(&new_item.now_state) {
                    seen_state.insert(new_item.now_state);
                    queue.push_back(new_item)
                }
            });
        }
        Self {
            serial_number: result[(random() * (result.len() as f64)) as usize].now_state,
        }
    }
    pub fn get_data(&self) -> JsValue {
        JsValue::from_serde(self).unwrap()
    }
}
#[cfg(test)]
mod test {
    use crate::GameData;

    #[test]
    fn test() {
        println!("{:?}", GameData::new());
    }
}
