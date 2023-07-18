import {
  Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow,
} from '@tremor/react'

function TableGlobal({ data, headers, renderCells }) {
  return (
    <Table className="mt-5">
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
          <TableRow key={index}>
            {headers.map((header, indexHeader) => (
              <TableCell key={indexHeader}>
                {
                  renderCells[header]
                    ? renderCells[header](item)
                    : item[header]
                }
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableGlobal
