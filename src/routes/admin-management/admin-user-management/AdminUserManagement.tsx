import { AxiosError } from "axios";
import { Button, Form, Modal, Select } from "antd";
import { IDetailUserData } from "@/shared/models/userServicesInterface";
import { TGeneralSelectOptions } from "@/shared/models/generalInterfaces";
import { useForm } from "antd/es/form/Form";
import addIcon from "@/assets/icon/add.png";
import DashboardTable from "@/shared/view/presentations/dashboard-table/DashboardTable";
import DashboardTableFilter from "@/shared/view/presentations/dashboard-table/DashboardTableFilter";
import ErrorBoundary from "@/shared/view/container/error-boundary/ErrorBoundary";
import FormCreation from "./view/presentations/Modal/FormCreation";
import FormFooter from "./view/presentations/Modal/FormFooter";
import useGenerateColumnAdminUser from "./usecase/useGenerateColumn";
import useModalReducer from "./usecase/useModalReducer";
import useMutateCreateAdmins from "./repositories/useCreateUser";
import useQueryAdmins from "./repositories/useGetAllUser";
import FormEdit from "./view/presentations/Modal/FormEdit";
import useQueryAdminsDetail from "./repositories/useGetDetailUser";
import LoadingHandler from "@/shared/view/container/loading/Loading";
import useMutateEditAdmins from "./repositories/useUpdateUser";
import TableHeaderTitle from "@/shared/view/presentations/table-header-title/TableHeaderTitle";

const AdminUserManagementContainer = () => {
  const [form] = useForm();
  const [formModal] = useForm();

  const { openModal, closeModal, modalState } = useModalReducer(formModal);

  const {
    data,
    roles,
    error,
    isLoading: loadingGetAll,
    setQueryAdmins,
    queryAdmins,
    refetch,
    handleFilter,
    clearFilter,
  } = useQueryAdmins(5, 1, form);

  const { mutate: mutateCreate } = useMutateCreateAdmins(closeModal, refetch);

  const { isLoading: loadingGetDetail } = useQueryAdminsDetail(
    modalState,
    formModal
  );
  const { mutate: mutateEdit } = useMutateEditAdmins(closeModal, refetch);
  const { columns } = useGenerateColumnAdminUser(openModal, mutateEdit);

  const modalType = {
    create: (
      <FormCreation
        roles={roles as TGeneralSelectOptions[]}
        form={formModal}
        handleMutate={mutateCreate}
        footer={
          <FormFooter
            secondaryText="Cancel"
            secondaryProps={{
              onClick: () => closeModal!(),
            }}
            primaryText="Create"
            primaryProps={{ type: "submit" }}
          />
        }
      />
    ),
    detail: (
      <LoadingHandler
        isLoading={loadingGetDetail}
        fullscreen={false}
        classname="h-[400px]"
      >
        <FormEdit
          id={modalState?.id}
          roles={roles as TGeneralSelectOptions[]}
          form={formModal}
          handleMutate={undefined}
          disable={true}
          footer={
            <FormFooter
              secondaryText="Cancel"
              secondaryProps={{
                onClick: () => closeModal!(),
              }}
              primaryText="Edit"
              primaryProps={{
                onClick: (e) => {
                  e.preventDefault();
                  openModal!("edit", modalState?.id);
                },
                type: "button",
              }}
            />
          }
        />
      </LoadingHandler>
    ),
    edit: (
      <LoadingHandler
        isLoading={loadingGetDetail}
        fullscreen={false}
        classname="h-[500px]"
      >
        <FormEdit
          id={modalState?.id}
          handleMutate={mutateEdit}
          roles={roles as TGeneralSelectOptions[]}
          form={formModal}
          disable={false}
          footer={
            <FormFooter
              secondaryText="Cancel"
              secondaryProps={{
                onClick: () => closeModal!(),
              }}
              primaryText="Save"
              primaryProps={{
                type: "submit",
              }}
            />
          }
        />
      </LoadingHandler>
    ),
  };

  return (
    <div>
      <ErrorBoundary error={error as AxiosError} refetch={refetch}>
        <>
          <TableHeaderTitle title="Admin User Management" />
          <Modal
            title={
              <div className="capitalize">{`${modalState?.type} User`}</div>
            }
            open={modalState?.isOpen}
            footer={null}
            onCancel={closeModal}
          >
            {modalType[modalState!.type]}
          </Modal>

          <DashboardTable<IDetailUserData>
            filterComponents={
              <DashboardTableFilter
                form={form}
                queryAdmins={queryAdmins}
                onApplyFilter={handleFilter}
                onClearFilter={clearFilter}
                buttonComponents={
                  <Button
                    onClick={() => openModal!("create")}
                    className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer"
                  >
                    <img src={addIcon} alt="add-icon" />
                    Create User
                  </Button>
                }
                filterComponents={
                  <>
                    <Form.Item
                      name={"status"}
                      label="Status"
                      initialValue={queryAdmins.status}
                      className="my-[10px]"
                    >
                      <Select
                        className="h-[35px]"
                        options={[
                          { value: "default", label: "All" },
                          { value: "active", label: "Active" },
                          { value: "inactive", label: "Inactive" },
                        ]}
                      />
                    </Form.Item>
                  </>
                }
                onSearch={setQueryAdmins}
              />
            }
            columns={columns}
            data={data}
            loading={loadingGetAll || loadingGetDetail}
            // metadata={data ? data.metadata : undefined}
            metadata={undefined}
            onPaginationChanges={setQueryAdmins}
          />
        </>
      </ErrorBoundary>
    </div>
  );
};

export default AdminUserManagementContainer;