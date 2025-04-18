import { useSearchParams } from "react-router";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type ProductPaginationProps = {
  totalPages: number;
};

export function ProductPagination({totalPages} : ProductPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  const getUrlWithPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `?${params.toString()}`;
  }
  return (
    <div>
      <Pagination>
        <PaginationContent>
          {!isFirstPage && 
          <>
          <PaginationItem>
            <PaginationPrevious to={getUrlWithPage(page - 1)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to={getUrlWithPage(page - 1)}>{page - 1}</PaginationLink>
          </PaginationItem>
          </>
          }
          <PaginationItem>
            <PaginationLink to="#" isActive>{page}</PaginationLink>
          </PaginationItem>
          {!isLastPage &&
            <>
            <PaginationItem>
              <PaginationLink to={getUrlWithPage(page + 1)}>{page + 1}</PaginationLink>
            </PaginationItem>
            {
              page + 1 < totalPages &&
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            }
            <PaginationItem>
              <PaginationNext to={getUrlWithPage(page + 1)} />
            </PaginationItem>
            </>
          }
        </PaginationContent>
      </Pagination>
    </div>
  );
}
