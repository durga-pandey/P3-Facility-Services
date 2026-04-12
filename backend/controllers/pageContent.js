import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import PageContent from "../models/pageContentModal.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import { deleteImage, uploadToCloudinary } from "../utils/helper.js";

export const createPageContent = CatchAsyncError(async (req, res, next) => {
  if (!req.body.page) {
    return next(new ErrorHandler("Page name is required", 400));
  }

  try {
    const heroSection = {
      type: "hero",
      hero: {
        title: req.body.hero?.title || "",
        animatedWords: req.body.hero?.animatedWords || [],
        tagline: req.body.hero?.tagline || "",
        backgroundImage: null,
      },
      description: { columns: [], features: [] },
      trust: { stats: [], testimonials: [], badges: [] },
    };

    const descriptionSection = {
      type: "description",
      hero: { animatedWords: [] },
      description: {
        heading: req.body.description?.heading || "",
        subheading: req.body.description?.subheading || "",
        columns: (req.body.description?.columns || []).map((col) => ({
          title: col.title,
          content: col.content,
          image: null,
          isActive: true,
          isDeleted: false,
        })),
        features: (req.body.description?.features || []).map((feat) => ({
          title: feat.title,
          desc: feat.desc,
          icon: null,
          isActive: true,
          isDeleted: false,
        })),
      },
      trust: { stats: [], testimonials: [], badges: [] },
    };

    const trustSection = {
      type: "trust",
      hero: { animatedWords: [] },
      description: { columns: [], features: [] },
      trust: {
        heading: req.body.trust?.heading || "",
        subheading: req.body.trust?.subheading || "",
        stats: req.body.trust?.stats || [],
        testimonials: (req.body.trust?.testimonials || []).map((t) => ({
          quote: t.quote,
          name: t.name,
          role: t.role,
          avatar: null,
          isActive: true,
          isDeleted: false,
        })),
        badges: (req.body.trust?.badges || []).map((b) => ({
          text: b.text,
          icon: null,
          isActive: true,
          isDeleted: false,
        })),
      },
    };

    const sections = [heroSection, descriptionSection, trustSection];

    const pageContent = await PageContent.create({
      page: req.body.page,
      sections,
    });

    res.status(201).json({
      success: true,
      message: "Page content created successfully",
      data: pageContent,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

export const updatePageContent = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const pageContent = await PageContent.findById(id);
  if (!pageContent) {
    return next(new ErrorHandler("Page content not found", 404));
  }

  try {
    if (req.body.page) pageContent.page = req.body.page;

    if (req.body.hero) {
      const heroSection = pageContent.sections.find((s) => s.type === "hero");
      if (heroSection) {
        if (req.body.hero.title) heroSection.hero.title = req.body.hero.title;
        if (req.body.hero.tagline)
          heroSection.hero.tagline = req.body.hero.tagline;
        if (req.body.hero.animatedWords)
          heroSection.hero.animatedWords = req.body.hero.animatedWords;

        heroSection.hero.backgroundImage =
          heroSection.hero.backgroundImage || null;
      }
    }

    if (req.body.description) {
      const descSection = pageContent.sections.find(
        (s) => s.type === "description"
      );
      if (descSection) {
        if (req.body.description.heading)
          descSection.description.heading = req.body.description.heading;
        if (req.body.description.subheading)
          descSection.description.subheading = req.body.description.subheading;

        if (req.body.description.columns) {
          descSection.description.columns = req.body.description.columns.map(
            (col) => ({
              title: col.title,
              content: col.content,
              image: null,
              isActive: true,
              isDeleted: false,
            })
          );
        }

        if (req.body.description.features) {
          descSection.description.features = req.body.description.features.map(
            (feat) => ({
              title: feat.title,
              desc: feat.desc,
              icon: null,
              isActive: true,
              isDeleted: false,
            })
          );
        }
      }
    }

    if (req.body.trust) {
      const trustSection = pageContent.sections.find((s) => s.type === "trust");
      if (trustSection) {
        if (req.body.trust.heading)
          trustSection.trust.heading = req.body.trust.heading;
        if (req.body.trust.subheading)
          trustSection.trust.subheading = req.body.trust.subheading;
        if (req.body.trust.stats)
          trustSection.trust.stats = req.body.trust.stats;

        if (req.body.trust.testimonials) {
          trustSection.trust.testimonials = req.body.trust.testimonials.map(
            (t) => ({
              quote: t.quote,
              name: t.name,
              role: t.role,
              avatar: null,
              isActive: true,
              isDeleted: false,
            })
          );
        }

        if (req.body.trust.badges) {
          trustSection.trust.badges = req.body.trust.badges.map((b) => ({
            text: b.text,
            icon: null,
            isActive: true,
            isDeleted: false,
          }));
        }
      }
    }

    await pageContent.save();

    res.status(200).json({
      success: true,
      message: "Page content updated successfully",
      data: pageContent,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

export const updatePageImages = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const pageContent = await PageContent.findById(id);
  if (!pageContent) {
    return next(new ErrorHandler("Page content not found", 404));
  }

  try {
    if (req.files?.heroBackground?.[0]) {
      const heroImg = await uploadToCloudinary(
        req.files.heroBackground[0],
        "page_hero"
      );
      pageContent.sections.forEach((section) => {
        if (section.type === "hero") {
          section.hero.backgroundImage = heroImg;
        }
      });
    }

    if (req.files?.columnImages) {
      for (let idx = 0; idx < req.files.columnImages.length; idx++) {
        const file = req.files.columnImages[idx];
        const colImg = await uploadToCloudinary(file, "page_columns");
        pageContent.sections.forEach((section) => {
          if (
            section.type === "description" &&
            section.description.columns[idx]
          ) {
            section.description.columns[idx].image = colImg;
          }
        });
      }
    }

    if (req.files?.featureIcons) {
      for (let idx = 0; idx < req.files.featureIcons.length; idx++) {
        const file = req.files.featureIcons[idx];
        const featIcon = await uploadToCloudinary(file, "page_features");
        pageContent.sections.forEach((section) => {
          if (
            section.type === "description" &&
            section.description.features[idx]
          ) {
            section.description.features[idx].icon = featIcon;
          }
        });
      }
    }

    if (req.files?.testimonialAvatars) {
      for (let idx = 0; idx < req.files.testimonialAvatars.length; idx++) {
        const file = req.files.testimonialAvatars[idx];
        const avatarImg = await uploadToCloudinary(file, "page_testimonials");
        pageContent.sections.forEach((section) => {
          if (section.type === "trust" && section.trust.testimonials[idx]) {
            section.trust.testimonials[idx].avatar = avatarImg;
          }
        });
      }
    }

    if (req.files?.badgeIcons) {
      for (let idx = 0; idx < req.files.badgeIcons.length; idx++) {
        const file = req.files.badgeIcons[idx];
        const badgeIcon = await uploadToCloudinary(file, "page_badges");
        pageContent.sections.forEach((section) => {
          if (section.type === "trust" && section.trust.badges[idx]) {
            section.trust.badges[idx].icon = badgeIcon;
          }
        });
      }
    }

    await pageContent.save();

    res.status(200).json({
      success: true,
      message: "Images updated successfully",
      data: pageContent,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  } finally {
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        req.files[key].forEach((file) => {
          fs.unlink(file.path, (err) => {
            if (err) console.error("File cleanup error:", err.message);
          });
        });
      });
    }
  }
});

export const getPageContentById = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const pageContent = await PageContent.findById(id);

  if (!pageContent) {
    return next(new ErrorHandler("Page content not found", 404));
  }

  res.status(200).json({
    success: true,
    data: pageContent,
  });
});

export const getAllPageContents = CatchAsyncError(async (req, res, next) => {
  const pageContents = await PageContent.find({
    isDeleted: false,
    isActive: true,
  });

  if (!pageContents || pageContents.length === 0) {
    return next(new ErrorHandler("No page contents found", 404));
  }

  const result = pageContents.map((page) => {
    const heroSection = page.sections.find((s) => s.type === "hero");
    const descSection = page.sections.find((s) => s.type === "description");
    const firstFeature = descSection?.description?.features?.[0];

    return {
      _id: page._id,
      page: page.page,
      title:
        heroSection?.hero?.title || descSection?.description?.heading || "",
      description:
        descSection?.description?.subheading ||
        heroSection?.hero?.tagline ||
        "",
      icon: firstFeature?.icon?.secure_url || null,
    };
  });

  res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
});

export const softDeletePageContent = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const page = await PageContent.findById(id);
  if (!page || page.isDeleted) {
    return next(
      new ErrorHandler("Page content not found or already deleted", 404)
    );
  }

  page.isDeleted = true;
  await page.save();

  res.status(200).json({
    success: true,
    message: "Page content soft-deleted successfully",
  });
});

export const hardDeletePageContent = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const page = await PageContent.findById(id);
  if (!page) {
    return next(new ErrorHandler("Page content not found", 404));
  }

  try {
    for (const section of page.sections) {
      await deleteImage(section.hero?.backgroundImage);

      section.description?.columns?.forEach(async (col) => {
        await deleteImage(col.image);
      });
      section.description?.features?.forEach(async (feat) => {
        await deleteImage(feat.icon);
      });

      section.trust?.testimonials?.forEach(async (t) => {
        await deleteImage(t.avatar);
      });
      section.trust?.badges?.forEach(async (b) => {
        await deleteImage(b.icon);
      });
    }

    await page.deleteOne();

    res.status(200).json({
      success: true,
      message: "Page content permanently deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Error deleting images from Cloudinary", 500));
  }
});

export const toggleActivePageContent = CatchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;

    const pageContent = await PageContent.findById(id);
    if (!pageContent)
      return next(new ErrorHandler("Page content not found", 404));

    pageContent.isActive = !pageContent.isActive;
    await pageContent.save();

    res.status(200).json({
      success: true,
      message: `Page content is now ${
        pageContent.isActive ? "active" : "inactive"
      }`,
      data: pageContent,
    });
  }
);

export const restorePageContent = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const pageContent = await PageContent.findById(id);
  if (!pageContent)
    return next(new ErrorHandler("Page content not found", 404));

  if (!pageContent.isDeleted) {
    return next(new ErrorHandler("Page content is not deleted", 400));
  }

  pageContent.isDeleted = false;
  await pageContent.save();

  res.status(200).json({
    success: true,
    message: "Page content restored successfully",
    data: pageContent,
  });
});
