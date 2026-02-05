'use client';
import { Group, Skeleton, Table } from '@mantine/core';

const TableSkeleton = ({ rows = 5, columns = 7 }) => (
  <Table.ScrollContainer minWidth={800}>
    <Table verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          {Array.from({ length: columns }).map((_, i) => (
            <Table.Th key={i}>
              <Skeleton height={16} width={80} radius="sm" />
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <Table.Tr key={rowIdx}>
            {Array.from({ length: columns }).map((_, colIdx) => (
              <Table.Td key={colIdx}>
                {colIdx === 0 ? (
                  <Group gap="sm">
                    <Skeleton height={60} width={60} radius="lg" />
                    <Skeleton height={16} width={150} radius="sm" />
                  </Group>
                ) : (
                  <Skeleton height={16} width={80} radius="sm" />
                )}
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  </Table.ScrollContainer>
);

export default TableSkeleton;
