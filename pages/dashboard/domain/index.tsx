import Link from "next/link";
import { useRouter } from "next/router";
import {
    BoxLayout,
    Button,
    Flex,
    ItemsTable,
    PageLayout,
} from "opize-design-system";
import { List } from "phosphor-react";
import { useEffect } from "react";
import { DashboardHeader } from "../../../components/pages/dashboard/header";
import { IndexFooter } from "../../../components/pages/index";
import { useUser } from "../../../hook/useUser";
import { examClient } from "../../../lib/client/client";

const Domains: {
    name: string;
    href: string;
}[] = [
    {
        name: "덕력고사",
        href: "/dashboard/domain/exam",
    },
];

export default function DomainDashboard() {
    const user = useUser({ roles: ["ADMIN"] });
    const router = useRouter();

    return (
        <>
            <DashboardHeader now="domain" />
            <BoxLayout minHeight="calc(100vh - 220px)" marginTop="8px">
                <ItemsTable>
                    {Domains.map((domain) => (
                        <ItemsTable.Row key={domain.name}>
                            <ItemsTable.Row.Avatar
                                icon={<List size={20} />}
                                name={domain.name}
                            />
                            <ItemsTable.Row.Component>
                                <Link href={domain.href} legacyBehavior>
                                    <Button as={"a"}>이동</Button>
                                </Link>
                            </ItemsTable.Row.Component>
                        </ItemsTable.Row>
                    ))}
                </ItemsTable>
            </BoxLayout>

            <IndexFooter />
        </>
    );
}
