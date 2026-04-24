import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import PropTypes from 'prop-types';

export const QuestionsTable = ({
  questions = [],
  totalEvaluations
}) => {
  return (
    <div className="px-20">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Porcentajes de aciertos por reactivo</CardTitle>
          <CardDescription>
            Análisis detallado del rendimiento en cada pregunta del examen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div role="table" className="rounded-lg overflow-hidden border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reactivo</TableHead>
                  <TableHead>Bloque</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Aciertos</TableHead>
                  <TableHead className="text-end">Porcentaje</TableHead>
                  <TableHead className="text-end">Internos</TableHead>
                  <TableHead className="text-end">Externos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  questions?.map((q) => (
                    <TableRow key={q.id}>
                      <TableCell>Reactivo {q.questionNumber}</TableCell>
                      <TableCell className="text-muted-foreground capitalize">
                        {q.block.toLowerCase()}
                      </TableCell>
                      <TableCell className="text-center">{totalEvaluations}</TableCell>
                      <TableCell className="text-center">{q.totalAccerts}</TableCell>
                      <TableCell className="text-end">
                        <Badge variant="secondary" className="text-sm">
                          {q.percentage}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-end">{q.internos}</TableCell>
                      <TableCell className="text-end">{q.externos}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center mt-4 w-full">
            <p className="text-sm text-muted-foreground">Mostrando 1-10 de 60 resultados</p>
            <Pagination className="justify-end w-min m-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

QuestionsTable.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    totalAccerts: PropTypes.number,
    questionNumber: PropTypes.number,
    block: PropTypes.string,
    percentage: PropTypes.number,
  })),
  totalEvaluations: PropTypes.number,
};
