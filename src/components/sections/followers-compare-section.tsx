import { checkFollowersIsFollowing } from "@/lib/check-followers";
import { $instagramUsers } from "@/stores/instagram-users-store";
import { useStore } from "@nanostores/react";
import { useEffect, useRef } from "react";
import { FollowersChart } from "../followers-comparation-pie-chat";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const FollowersCompareSection = () => {
  const { followers, following } = useStore($instagramUsers);

  const sectionRef = useRef<HTMLElement>(null);

  const followersThatAreNotFollowing = checkFollowersIsFollowing(
    followers,
    following,
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    if (followers.length > 0 && following.length > 0) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [followersThatAreNotFollowing]);

  return (
    following.length > 0 &&
    followers.length > 0 && (
      <section ref={sectionRef} className=" space-y-8">
        <h2 className="text-2xl font-semibold">
          Usuarios que no te siguen ({followersThatAreNotFollowing.length})
        </h2>
        <div className="flex  flex-col md:flex-row gap-6">
          <FollowersChart />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {followersThatAreNotFollowing.map((user) => (
                <TableRow key={user.value}>
                  <TableCell>
                    <a
                      target="_blank"
                      className="hover:underline"
                      href={user.href}
                    >
                      @{user.value}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    )
  );
};

export default FollowersCompareSection;
