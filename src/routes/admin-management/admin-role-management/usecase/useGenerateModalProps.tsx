
interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}


const useGenerateModalProps = (
) => {

  const options: Option[] = [
  {
    label: 'Admin User Management (P1)',
    value: 'admin management',
    children: [
      {
        label: 'Create Admin User',
        value: 'create'
      },
      {
        label: 'View Admin User',
        value: 'view'
      },
      {
        label: 'Update Admin User',
        value: 'update'
      },
      {
        label: 'Delete Admin User',
        value: 'delete'
      },
    ]
  },
  {
    label: 'Vendor Management (P1)',
    value: 'vendor management',
    children: [
      {
        label: 'Create Vendor',
        value: 'create'
      },
      {
        label: 'View Vendor',
        value: 'view'
      },
      {
        label: 'Update Vendor',
        value: 'update'
      },
      {
        label: 'Delete Vendor',
        value: 'delete'
      },
    ]
  },
  {
    label: 'Vendor Content (P1)',
    value: 'vendor content',
    children: [
      {
        label: 'Create Vendor Content',
        value: 'create'
      },
      {
        label: 'View Vendor Content',
        value: 'view'
      },
      {
        label: 'Update Vendor Content',
        value: 'update'
      },
      {
        label: 'Delete Vendor Content',
        value: 'delete'
      },
    ]
  },
];

  const transformToPayload = (input) => {
    const permissionsKey = input.permissions ? 'permissions' : 'permissions_edit';

    const result = {
        name: input.name,
        permissions: []
    };

    const permissionMap = new Map();

    input[permissionsKey].forEach(permission => {
        const feature = permission[0];
        const access = permission[1] || "all";

        if (!permissionMap.has(feature)) {
            permissionMap.set(feature, []);
        }

        if (access === "all") {
            permissionMap.set(feature, ["create", "delete", "update", "view"]);
        } else {
            permissionMap.get(feature).push(access);
        }
    });

    permissionMap.forEach((accessList, feature) => {
        result.permissions.push({
            feature_permission: feature,
            feature_access: accessList
        } as never);
    });

    return result;
  }

  function transformToCascaderData(input) {
      const result = {
          name: input.name,
          permissions_edit: []
      };

      input.permissions.forEach(permission => {
          const feature = permission.feature_permission;
          const accesses = permission.feature_access;

          if (accesses.length === 0) {
              result.permissions_edit.push([feature] as never);
          } else {
              accesses.forEach(access => {
                  result.permissions_edit.push([feature, access] as never);
              });
          }
      });

      // Remove any empty permission arrays
      result.permissions_edit = result.permissions_edit.filter((permission: any) => permission?.length > 1);

      return result;
  }

  return {options, transformToPayload, transformToCascaderData}
}

export default useGenerateModalProps