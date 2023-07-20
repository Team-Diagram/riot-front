import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'

function TableGlobal(props) {
  const {
    data,
    headers,
    renderCells,
    onClick,
    onOverRow,
    onLeaveRow,
  } = props

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header, index) => (
            <TableHeaderCell key={index}>
              {header}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            className="table-row-equipments"
            onClick={() => onClick}
            onMouseEnter={() => onOverRow(item)}
            onMouseLeave={() => onLeaveRow(item)}
          >
            {headers.map((header, indexHeader) => (
              <TableCell key={indexHeader}>
                {renderCells[header] ? renderCells[header](item) : item[header]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableGlobal
