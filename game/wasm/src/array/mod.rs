use js_sys::Math::random;
use serde::{Deserialize, Serialize};
use std::collections::{HashSet, LinkedList};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

use crate::array::queue_item::QueueItem;

mod queue_item;

#[wasm_bindgen]
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct GameData {
    #[serde(rename = "serialNumber")]
    serial_number: [u8; 9],
}
#[wasm_bindgen]
impl GameData {
    pub fn new(serial_number: JsValue) -> Option<GameData> {
        let serial_number = serial_number.into_serde().ok()?;
        Some(Self { serial_number })
    }
    pub fn random() -> Self {
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
        while let Some(q_item) = queue.pop_front() {
            match q_item.operations.len().cmp(&max_steps) {
                std::cmp::Ordering::Greater => {
                    max_steps = q_item.operations.len();
                    result.clear();
                    result.push(q_item.clone())
                }
                std::cmp::Ordering::Equal => {
                    result.push(q_item.clone());
                }
                _ => {}
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
    pub fn get_steps(&self) -> Option<String> {
        let mut target = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        target
            .iter_mut()
            .filter(|x| !self.serial_number.contains(x))
            .for_each(|x| *x = 0);
        let mut queue = LinkedList::new();
        queue.push_back(QueueItem::new(self.serial_number, String::new()));
        let mut seen = HashSet::new();
        seen.insert(self.serial_number);
        loop {
            let q_item = match queue.pop_front() {
                None => break,
                Some(v) => v,
            };
            if q_item.now_state == target {
                return Some(q_item.operations);
            }
            q_item.next().into_iter().for_each(|x| {
                if !seen.contains(&x.now_state) {
                    seen.insert(x.now_state);
                    queue.push_back(x);
                }
            });
        }
        None
    }
}

#[cfg(test)]
mod test {
    use super::GameData;

    #[test]
    fn test_get_steps() {
        let game_data = GameData {
            serial_number: [1, 2, 0, 4, 5, 6, 7, 8, 9],
        };
        game_data.get_steps();
    }
}
