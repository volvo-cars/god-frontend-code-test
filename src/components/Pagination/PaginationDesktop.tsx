import { Flex, IconButton, Spacer } from 'vcc-ui';
import { changePage } from '../../logic';

type PaginationDesktopPropsType = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalPages: number;
};

const Pagination: React.FC<PaginationDesktopPropsType> = (props) => {
  const { page, setPage, totalPages } = props;

  const handlePageChange = ({ forward }: { forward: boolean }) => {
    setPage(changePage(page, forward));
  };

  return totalPages ? (
    <Flex
      extend={{
        flexDirection: 'row',
        justifyContent: 'end',
        marginTop: '16px',
        untilM: {
          display: 'none',
        },
      }}
    >
      <IconButton
        iconName='navigation-chevronback'
        variant='outline'
        onClick={() => handlePageChange({ forward: false })}
        disabled={page === 1}
      />
      <Spacer />
      <IconButton
        iconName='navigation-chevronforward'
        variant='outline'
        onClick={() => handlePageChange({ forward: true })}
        disabled={page === totalPages}
      />
      <Spacer size={2} />
    </Flex>
  ) : null;
};

export default Pagination;
