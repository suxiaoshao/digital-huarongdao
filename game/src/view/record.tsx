import React, { useEffect } from 'react';
import { getGameRecordList } from '../util/store';

export default function Record(): JSX.Element {
  useEffect(() => {
    console.log(getGameRecordList());
  }, []);
  return <div />;
}
