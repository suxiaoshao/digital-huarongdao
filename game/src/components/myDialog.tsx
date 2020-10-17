import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import '../style/game/myDialog.scss';
import { SerialNum } from '../view/game';
import { TipData } from '../view/tip';

interface TipDialogProps {
  open: boolean;
  onClose: () => void;
  src: string;
  serialNumber: SerialNum[];
}

export function TipDialog(props: TipDialogProps): JSX.Element {
  const myHistory = useHistory<TipData>();
  return (
    <Dialog open={props.open} className="my-dialog" onClose={props.onClose}>
      <DialogTitle>提示</DialogTitle>
      <DialogContent>
        <DialogContentText>以下操作本局记录不会被保存</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.onClose();
          }}
        >
          取消
        </Button>
        <Button
          onClick={() => {
            myHistory.push('/');
          }}
        >
          返回首页
        </Button>
        <Button
          onClick={() => {
            myHistory.push({
              pathname: '/tip',
              state: {
                serialNumber: props.serialNumber,
                src: props.src,
              },
            });
          }}
        >
          查看提示
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface RecordDialogProps {
  open: boolean;
  onClose: () => void;
}

export function RecordDialog(props: RecordDialogProps): JSX.Element {
  const myHistory = useHistory();
  return (
    <Dialog open={props.open} className="my-dialog" onClose={props.onClose}>
      <DialogTitle>提示</DialogTitle>
      <DialogContent>
        <DialogContentText>直接退出的话无法保存当前对局</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.onClose();
          }}
        >
          取消
        </Button>
        <Button
          onClick={() => {
            myHistory.push('/record');
          }}
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}
