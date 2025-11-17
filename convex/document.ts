import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const archive = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated!");
    }

    const userId = identity.subject;
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Document not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

        for(const child of children){
            await ctx.db.patch(child._id, {isArchived: true});
            await recursiveArchive(child._id);
        }

      for (const child of children) {
        await ctx.db.patch(child._id, { isArchived: true });
        await recursiveArchive(child._id);
      }
    };

  const document = await ctx.db.patch(args.id, { isArchived: true });
    await recursiveArchive(args.id);

    return document
  },
});
