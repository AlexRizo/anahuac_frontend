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

export const QuestionsTable = () => {
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
                <TableRow>
                  <TableCell>ES-BM-R30</TableCell>
                  <TableCell className="text-muted-foreground">
                    Razonamiento Lógico Matemático
                  </TableCell>
                  <TableCell className="text-center">200</TableCell>
                  <TableCell className="text-center">160</TableCell>
                  <TableCell className="text-end">
                    <Badge variant="secondary" className="text-sm">
                      80.0%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-end">90.0%</TableCell>
                  <TableCell className="text-end">70.0%</TableCell>
                </TableRow>
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
