import { useMsal } from "@azure/msal-react";
import { type ClaimType, createClaimsTable } from "../../utils/claimUtils";

export const UserProfile = () => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();
    const tokenClaims:ClaimType[] = createClaimsTable(activeAccount?.idTokenClaims!);
    console.log(tokenClaims);

    const tableRow = tokenClaims.map((claim,index) => {
        return (
            <tr key={index}>
                <td>{claim.claim}</td>
                <td>{claim.value}</td>
                <td>{claim.description}</td>
            </tr>
        );
    });
    return (
        <>
            <div className="data-area-div">
                <p>
                    See below the claims in your <strong> ID token </strong>. For more information, visit:{' '}
                    <span>
                        <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens#claims-in-an-id-token">
                            docs.microsoft.com
                        </a>
                    </span>
                </p>
                <div className="data-area-div">
                    <table className="table  table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Claim</th>
                                <th>Value</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>{tableRow}</tbody>
                    </table>
                </div>
            </div>
        </>
    );
}