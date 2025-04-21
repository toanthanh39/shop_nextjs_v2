<meta charset="UTF-8" />
<style>
	@print {
		size: A4; /* Set page size */
		margin: 10cm; /* Set margins */

		#bill {
			width: 58mm; /* Set the paper width */
			font-size: 12px;
			height: 400px;
			color: #3a393a;
		}

		.receipt {
			width: 100%;
			position: relative;
		}
	}

	p {
		margin: 0;
	}

	h1 {
		font-size: 18px;
		font-weight: 600;
		margin: 0;
	}

	strong {
		font-weight: 600;
	}

	.text-sm {
		font-size: 8px;
	}

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		width: fit-content;
		margin: 0 auto;
		gap: 4px;
		margin-bottom: 12px;
	}

	.table_detail {
		border-collapse: collapse;
	}

	.table_detail tbody tr:first-child {
		border-top: 2px solid #000 !important;
	}
	.td_right {
		width: 50%;
		text-align: right;
	}

	.td_left {
		width: 50%;
		text-align: right;
	}

	.tr {
		width: 100%;
	}

	.flex_col {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.endsection {
		border-bottom: 1px dashed #333;
		padding-bottom: 12px;
	}

	.flex {
		display: flex;
		justify-content: space-between;
		gap: 4px;
	}

	.customer {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin: 12px 0;
	}
	.logo {
		width: 31px;
		height: 31px;
	}

	.flex-shrink {
		flex-shrink: 0;
		flex-grow: 1;
	}
</style>
<div
	id="bill"
	class="receipt"
	style="
		margin: 0;
		font-family: Helvetica;
		font-size: 12px;
		page-break-after: always;
	">
	<div class="header">
		<img
			class="logo"
			width="31px"
			height="31px"
			st
			src="https://ldevasset.namefragrance.vn/uploads/filecloud/1/2025/January/49970-395041736328041-1736328041.png"
			alt="logo" />
		<div style="width: fit-content">
			<h1>namperfume</h1>
			<p class="text-sm">www.namperfume.net</p>
		</div>
	</div>
	<div>
		<div class="flex-col" style="margin: 0 0 12px 0">
			<p><strong>Địa chỉ:</strong> {{ store.address }}</p>
			<p><strong>Điện thoại:</strong> {{ store.phone }}</p>
			<p><strong>Nhân viên:</strong> {{ label_seller }}</p>
			<p><strong>Ngày bán:</strong> {{ date_created }}</p>
		</div>
		<div style="clear: both"></div>
	</div>
	<div style="width: 100%; text-align: center; margin-bottom: 12px">
		<h3
			style="font-size: 14px; line-height: 12px; text-align: center; margin: 0">
			Hóa đơn: {{ code }}
		</h3>
	</div>
	<div style="width: 100%">
		<table
			style="
				margin: 0 0 12px 0;
				font-size: 12px;
				width: 100%;
				border-top: 2px solid #000;
				border-bottom: 1px dashed #333;
			"
			class="table_detail">
			<thead>
				<tr>
					<th style="width: 60%; text-align: left; padding: 5px 0px">
						Đơn giá
					</th>
					<th style="width: 10%; text-align: center; padding: 5px 0px">SL</th>
					<th style="width: 30%; text-align: right; padding: 5px">T.Tiền</th>
				</tr>
			</thead>
			<tbody>
				{% for product in details.data %}
				<tr valign="top" style="border-top: 1px solid #d9d9d9">
					<td colspan="3" style="padding: 5px 0px 0">
						<p style="margin-bottom: 5px">
							{{ product.item_name }}
							{% if product.product_json.option_name %} -
							<span style="margin: 0">{{
								product.product_json.option_name
							}}</span>
							{% endif %} - <span>{{ product.product_json.sku }}</span>
						</p>
					</td>
				</tr>
				<tr valign="top">
					<td style="padding: 5px 0px; text-align: left">
						{{ product.item_unit_price | currency }}
					</td>
					<td style="padding: 5px 0px; text-align: center">
						{{ product.item_quantity }}
					</td>
					<td style="padding: 5px 0px; text-align: right">
						{{ product.price_sell | currency }}
					</td>
				</tr>
				{% endfor %}
			</tbody>
		</table>
		<table
			style="
				font-size: 12px;
				width: 100%;
				margin: 0 0 12px 0;
				text-align: right;
			"
			class="endsection">
			<tbody>
				<tr class="tr">
					<td class="td_left">Phí vận chuyển:</td>
					<td class="td_right">
						{{ price_shipping | currency }}
					</td>
				</tr>
				{% if price_tax %}
				<tr>
					<td class="td_left">Phí VAT:</td>

					<td class="td_right">
						{{ price_tax_value | currency }}
					</td>
				</tr>
				{% endif %} {% for promotion in promotions %}
				<tr>
					<td class="td_left">Khuyến mãi:</td>
					<td class="td_right">
						{{ promotion.code }}
					</td>
				</tr>
				{% endfor %} {% if price_discount %}
				<tr>
					<td class="td_left">Giảm giá:</td>
					<td class="td_right">
						{{ price_discount | currency }}
					</td>
				</tr>
				{% endif %}
				<tr>
					<td class="td_left">
						<strong>Thành tiền:</strong>
					</td>
					<td class="td_right">
						<strong> {{ price_final | currency }}</strong>
					</td>
				</tr>
				<tr>
					<td class="td_left">Tiền phải thanh toán:</td>
					<td class="td_right">
						{{ debt | currency }}
					</td>
				</tr>
				<tr>
					<td class="td_left">Tiền đã thanh toán:</td>
					<td class="td_right">
						{{ deposit | currency }}
					</td>
				</tr>
			</tbody>
		</table>
		<div class="customer endsection">
			<div class="flex">
				<strong>Tên khách</strong>
				<p>{{ billing_fullname }}</p>
			</div>

			<div class="flex">
				<strong>Điện thoại</strong>
				<p>{{ billing_phone }}</p>
			</div>

			<div class="flex">
				<strong>Điểm hiện tại</strong>
				<p>0</p>
			</div>

			<div class="flex">
				<strong>Điểm tích lũy</strong>
				<p>0</p>
			</div>
		</div>
		{% if note %}
		<table style="font-size: 12px; width: 100%; margin: 0 0 12px 0">
			<tr>
				<td>
					<p style="font-style: italic">Ghi chú: {{ note }}</p>
				</td>
			</tr>
		</table>
		{% endif %} {% if showAddress %}
		<div>
			<p class="" style="font-style: italic">Tên: {{ shipping_fullname }}</p>
		</div>
		<div>
			<p class="" style="font-style: italic">SĐT: {{ shipping_phone }}</p>
		</div>
		<div>
			<p class="" style="font-style: italic">
				Địa chỉ giao: {{ shipping_full_address }}
			</p>
		</div>

		{% endif %}
	</div>
	<div style="clear: both"></div>
</div>
