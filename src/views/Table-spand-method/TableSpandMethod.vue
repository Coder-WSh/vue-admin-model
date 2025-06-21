<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="amount1" label="Amount 1" />
      <el-table-column prop="amount2" label="Amount 2" />
      <el-table-column prop="amount3" label="Amount 3" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumnCtx } from "element-plus";

interface User {
  id: string;
  name: string;
  amount1: string;
  amount2: string;
  amount3: number;
}

interface SpanMethodProps {
  row: User;
  column: TableColumnCtx<User>;
  rowIndex: number;
  columnIndex: number;
}
type UserItem = keyof User;
// const arraySpanMethod: () => any = () => {
//   return { rowSpan: 1, colSpan: 2 };
// };

const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  // columnIndex,
}: SpanMethodProps) => {
  const columnProp = column.property as UserItem;
  if (rowIndex === 0) {
    return {
      rowspan: conculateMaxLength(rowIndex, row[columnProp], columnProp),
      colspan: 1,
    };
  }

  if (row[columnProp] === tableData.value[rowIndex - 1][columnProp]) {
    return {
      rowspan: 0,
      colspan: 0,
    };
  } else {
    return {
      rowspan: conculateMaxLength(rowIndex, row[columnProp], columnProp),
      colspan: 1,
    };
  }
};

const conculateMaxLength = (
  start: number,
  sameTarget: string | number,
  label: UserItem
) => {
  const replaceTarget = tableData.value.slice(start + 1);
  let j = 1;
  for (let i of replaceTarget) {
    console.log("sameTarget", sameTarget);
    if (i[label] === sameTarget) {
      j++;
    } else {
      return j;
    }
  }
  return j;
};

const tableData: Ref<User[]> = ref([
  {
    id: "12987122",
    name: "Tom",
    amount1: "234",
    amount2: "3.2",
    amount3: 10,
  },
  {
    id: "12987123",
    name: "Tom",
    amount1: "234",
    amount2: "4.43",
    amount3: 12,
  },
  {
    id: "12987123",
    name: "Tom",
    amount1: "324",
    amount2: "1.9",
    amount3: 9,
  },
  {
    id: "12987125",
    name: "Tom",
    amount1: "621",
    amount2: "2.2",
    amount3: 15,
  },
  {
    id: "12987126",
    name: "Tom",
    amount1: "539",
    amount2: "4.1",
    amount3: 15,
  },
]);
</script>
