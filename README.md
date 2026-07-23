# Kaynak UG (haftungsbeschränkt) corporate website

Static corporate website for `kaynak.eu`, with German and English company
content plus German, English, and French Cliqly legal pages. The site has no runtime
dependencies, cookies, analytics, contact form, or externally loaded fonts.

## Publishing with GitHub Pages

1. Create a public GitHub repository dedicated to this website.
2. Push the contents of this directory to the repository's `main` branch.
3. In **Settings → Pages**, choose **Deploy from a branch**, then select
   `main` and `/ (root)`.
4. Set the custom domain to `kaynak.eu` and enable **Enforce HTTPS** as soon as
   the certificate is available.
5. Verify the domain in the GitHub account or organisation settings.

## DNS at IONOS

For the apex domain `kaynak.eu`, add these four `A` records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For `www.kaynak.eu`, add a `CNAME` that points to the GitHub Pages host of the
repository owner, for example:

```text
COE-OG.github.io
```

Keep existing `MX`, `SPF`, `DKIM`, and `DMARC` records unchanged so email
continues to work.

## Local preview

Serve this directory with any static web server. Absolute paths are used
because the production site runs at the root of `kaynak.eu`.

## Content source

Company details and the Cliqly product description were derived from the
current legal and product documentation in the Cliqly project. The public Cliqly
privacy policies and terms mirror the July 2026 app documents in `Cliqly/Legal`.
Review both copies whenever product behaviour, service providers, company,
hosting, or contact details change.
