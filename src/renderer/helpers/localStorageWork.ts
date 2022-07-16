export interface DataFale {
  fileName: string;
  folderPath: string;
}

const SetLocalStorageData = (data: DataFale): void => {
  const ls = localStorage.getItem('info5file') || '[]';
  const lsArr: Array<DataFale> = JSON.parse(ls);
  lsArr.unshift(data);
  if (lsArr.length > 5) lsArr.pop();
  localStorage.setItem('info5file', JSON.stringify(lsArr));
};

const GetlocalStorageData: () => DataFale[] = () => {
  const ls = localStorage.getItem('info5file') || '[]';
  const data: DataFale[] = JSON.parse(ls);
  return data;
};

export default { SetLocalStorageData, GetlocalStorageData };
