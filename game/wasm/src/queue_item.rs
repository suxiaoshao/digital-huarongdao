#[derive(Clone, Debug)]
pub struct QueueItem {
    pub now_state: [u8; 9],
    pub operations: String,
    zero_index: usize,
}
impl QueueItem {
    pub fn new(now_state: [u8; 9], steps: String) -> Self {
        let zero_index = now_state.iter().position(|x| *x == 0).unwrap();
        Self {
            now_state,
            operations: steps,
            zero_index,
        }
    }
    pub fn next(&self) -> Vec<Self> {
        let mut new_item_list = vec![];
        let x_index = self.zero_index / 3;
        let y_index = self.zero_index % 3;
        if x_index >= 1 {
            let mut now_state = self.now_state;
            let zero_index = (x_index - 1) * 3 + y_index;
            now_state[self.zero_index] = now_state[zero_index];
            now_state[zero_index] = 0;
            new_item_list.push(QueueItem::new(now_state, self.operations.clone() + "w"))
        }
        if x_index <= 1 {
            let mut now_state = self.now_state;
            let zero_index = (x_index + 1) * 3 + y_index;
            now_state[self.zero_index] = now_state[zero_index];
            now_state[zero_index] = 0;
            new_item_list.push(QueueItem::new(now_state, self.operations.clone() + "s"))
        }
        if y_index >= 1 {
            let mut now_state = self.now_state;
            let zero_index = x_index * 3 + y_index - 1;
            now_state[self.zero_index] = now_state[zero_index];
            now_state[zero_index] = 0;
            new_item_list.push(QueueItem::new(now_state, self.operations.clone() + "a"))
        }
        if y_index <= 1 {
            let mut now_state = self.now_state;
            let zero_index = x_index * 3 + y_index + 1;
            now_state[self.zero_index] = now_state[zero_index];
            now_state[zero_index] = 0;
            new_item_list.push(QueueItem::new(now_state, self.operations.clone() + "d"))
        }
        new_item_list
    }
}
