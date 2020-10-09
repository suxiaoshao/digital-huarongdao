import React from 'react';
import '../style/game/info.scss';
import {List, Paper, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import { DirectionsWalk, QueryBuilder } from '@material-ui/icons';

interface InfoProps {
  src: string;
  stepsNum: number;
  swapStepsNum: number;
}

export default function Info(props: InfoProps): JSX.Element {
  return (
    <div className="info">
      <div className="image">
        <img alt="图片" src={props.src} />
      </div>
      <Paper elevation={0} className="massage">
        <List>
          <ListItem>
            <ListItemIcon>
              <DirectionsWalk />
            </ListItemIcon>
            <ListItemText>已走 {props.stepsNum} 步</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <QueryBuilder />
            </ListItemIcon>
            <ListItemText>还有 {props.swapStepsNum} 步交换</ListItemText>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}
