'use client';

import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Table, Text } from '@mantine/core';

const VIRTUALIZATION_THRESHOLD = 50;

const VirtualizedTable = ({
  data,
  columns,
  renderRow,
  estimateSize = 60,
  minWidth = 800,
  emptyMessage = 'No data found',
}) => {
  const parentRef = useRef(null);
  const shouldVirtualize = data.length > VIRTUALIZATION_THRESHOLD;

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 10,
  });

  // For small lists, render normally without virtualization
  if (!shouldVirtualize) {
    return (
      <Table.ScrollContainer minWidth={minWidth}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              {columns.map((col, i) => (
                <Table.Th key={i}>{col.header}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.length > 0 ? (
              data.map((item, index) => renderRow(item, index))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={columns.length}>
                  <Text ta="center" c="dimmed" py="md">
                    {emptyMessage}
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    );
  }

  // For large lists, use virtualization
  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div style={{ minWidth }}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            {columns.map((col, i) => (
              <Table.Th key={i}>{col.header}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
      </Table>
      <div
        ref={parentRef}
        style={{
          height: '500px',
          overflow: 'auto',
          contain: 'strict',
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          <Table verticalSpacing="sm">
            <Table.Tbody>
              {virtualItems.map((virtualItem) => {
                const item = data[virtualItem.index];
                return (
                  <Table.Tr
                    key={virtualItem.key}
                    data-index={virtualItem.index}
                    ref={virtualizer.measureElement}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualItem.start}px)`,
                      display: 'table-row',
                    }}
                  >
                    {renderRow(item, virtualItem.index, true)}
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default VirtualizedTable;
