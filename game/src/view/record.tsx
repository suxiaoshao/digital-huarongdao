import React, { useState } from 'react';
import { GameRecordItem, getGameRecordList, clearGameRecord } from '../util/store';
import {
  Button,
  List,
  Card,
  CardMedia,
  CardContent,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
} from '@material-ui/core';
import '../style/record.scss';
import { useHistory } from 'react-router-dom';
import { AccessAlarm, AlarmOn, DirectionsWalk } from '@material-ui/icons';
import dayjs from 'dayjs';

function MyListItem(props: GameRecordItem): JSX.Element {
  return (
    <>
      <Card className="list-item" elevation={0}>
        <CardMedia className={'image'} image={props.src} />
        <CardContent className="card-content">
          <List>
            <ListItem>
              <ListItemIcon>
                <AccessAlarm />
              </ListItemIcon>
              <ListItemText primary={'用时'} secondary={`${props.useTime} s`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DirectionsWalk />
              </ListItemIcon>
              <ListItemText primary={'步长'} secondary={props.steps.length} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AlarmOn />
              </ListItemIcon>
              <ListItemText primary={'完成于'} secondary={dayjs(props.timeStamp).format('YYYY-M-D H:m')} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Divider variant="middle" />
    </>
  );
}

export default function Record(): JSX.Element {
  const myHistory = useHistory();
  const [recordList, setRecordList] = useState<GameRecordItem[]>(getGameRecordList());
  return (
    <div className="record">
      {recordList.length !== 0 ? (
        <List className="list">
          {recordList.map<React.ReactNode>((value) => {
            return <MyListItem {...value} key={value.timeStamp} />;
          })}
        </List>
      ) : (
        <div className={'empty'}>
          <Typography variant={'h5'}>暂时没有记录</Typography>
        </div>
      )}

      <div className="button-group">
        <Button
          variant="contained"
          color="primary"
          className="start-button"
          onClick={() => {
            clearGameRecord();
            setRecordList([]);
          }}
        >
          清空战绩
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="start-button"
          onClick={() => {
            myHistory.push('/');
          }}
        >
          返回首页
        </Button>
      </div>
    </div>
  );
}
